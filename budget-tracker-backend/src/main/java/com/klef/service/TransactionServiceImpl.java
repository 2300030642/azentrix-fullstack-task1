package com.klef.service;

import com.klef.dto.SummaryResponse;
import com.klef.entity.Transaction;
import com.klef.repo.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;

    public TransactionServiceImpl(TransactionRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @Override
    public Transaction getTransactionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found with id: " + id));
    }

    @Override
    public Transaction createTransaction(Transaction transaction) {
        return repository.save(transaction);
    }

    @Override
    public Transaction updateTransaction(Long id, Transaction transaction) {

        Transaction existingTransaction = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found with id: " + id));

        existingTransaction.setTitle(transaction.getTitle());
        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setType(transaction.getType());
        existingTransaction.setCategory(transaction.getCategory());
        existingTransaction.setTransactionDate(transaction.getTransactionDate());

        return repository.save(existingTransaction);
    }

    @Override
    public void deleteTransaction(Long id) {

        Transaction transaction = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found with id: " + id));

        repository.delete(transaction);
    }

    @Override
    public SummaryResponse getSummary() {

        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();
        int currentYear = currentDate.getYear();

        List<Transaction> transactions = repository.findAll();

        double totalIncome = transactions.stream()
                .filter(t -> t.getTransactionDate() != null)
                .filter(t -> t.getTransactionDate().getMonthValue() == currentMonth)
                .filter(t -> t.getTransactionDate().getYear() == currentYear)
                .filter(t -> "INCOME".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalExpense = transactions.stream()
                .filter(t -> t.getTransactionDate() != null)
                .filter(t -> t.getTransactionDate().getMonthValue() == currentMonth)
                .filter(t -> t.getTransactionDate().getYear() == currentYear)
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double balance = totalIncome - totalExpense;

        return new SummaryResponse(
                totalIncome,
                totalExpense,
                balance
        );
    }
}