package com.klef.controller;


import com.klef.entity.Transaction;
import com.klef.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.klef.dto.SummaryResponse;


@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                transactionService.getTransactionById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction) {

        return ResponseEntity.ok(
                transactionService.createTransaction(transaction)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transaction) {

        return ResponseEntity.ok(
                transactionService.updateTransaction(id, transaction)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(
            @PathVariable Long id) {

        transactionService.deleteTransaction(id);

        return ResponseEntity.ok("Transaction deleted successfully");
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryResponse> getSummary() {
        return ResponseEntity.ok(
                transactionService.getSummary()
        );
    }
}