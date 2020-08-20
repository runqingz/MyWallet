package com.runz.pmtool.customResponse;

import java.util.List;

import com.runz.pmtool.domain.Task.TaskType;

public class StatisticsResponse {
    public enum StatsScope {
        ANNUALY, MONTHLY
    }

    private Double totalIncome = 0.0;
    private Double totalExpense = 0.0;
    private List<AggregateSum> incomes;
    private List<AggregateSum> expenses;
    private List<AggregateSum> typedExpenses;

    public interface AggregateSum {
        Double getSum();
        Integer getGroup();
        TaskType getType();
    }

    public StatisticsResponse() {
    }

    public List<AggregateSum> getIncomes() {
        return incomes;
    }

    public void setIncomes(List<AggregateSum> incomes) {
        this.incomes = incomes;
    }

    public List<AggregateSum> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<AggregateSum> expenses) {
        this.expenses = expenses;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public List<AggregateSum> getTypedExpenses() {
        return typedExpenses;
    }

    public void setTypedExpenses(List<AggregateSum> typedExpenses) {
        this.typedExpenses = typedExpenses;
    }
}
