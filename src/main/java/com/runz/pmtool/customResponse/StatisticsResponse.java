package com.runz.pmtool.customResponse;

import java.util.List;

public class StatisticsResponse {
    private Double incomeSum;
    private Double expenseSum;
    private List<Double> aggregateIncomes;
    private List<Double> aggregateExpenses;

    public StatisticsResponse() {
    }

    public Double getIncomeSum() {
        return incomeSum;
    }

    public void setIncomeSum(Double incomeSum) {
        this.incomeSum = incomeSum;
    }

    public Double getExpenseSum() {
        return expenseSum;
    }

    public void setExpenseSum(Double expenseSum) {
        this.expenseSum = expenseSum;
    }

    public List<Double> getAggregateIncomes() {
        return aggregateIncomes;
    }

    public void setAggregateIncomes(List<Double> aggregateIncomes) {
        this.aggregateIncomes = aggregateIncomes;
    }

    public List<Double> getAggregateExpenses() {
        return aggregateExpenses;
    }

    public void setAggregateExpenses(List<Double> aggregateExpenses) {
        this.aggregateExpenses = aggregateExpenses;
    }
}
