package com.runz.pmtool.customResponse;

import java.util.List;

public class StatisticsResponse {
    private List<AggregateSum> incomes;
    private List<AggregateSum> expenses;

    public interface AggregateSum {
        Double getSum();
        Integer getGroup();
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
}
