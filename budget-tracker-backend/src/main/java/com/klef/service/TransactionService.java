package com.klef.service;

import com.klef.dto.SummaryResponse;
import com.klef.entity.Transaction;

import java.util.List;

public interface TransactionService {

    List<Transaction> getAllTransactions();

    Transaction getTransactionById(Long id);

    Transaction createTransaction(Transaction transaction);

    Transaction updateTransaction(Long id, Transaction transaction);

    void deleteTransaction(Long id);

    SummaryResponse getSummary();
}