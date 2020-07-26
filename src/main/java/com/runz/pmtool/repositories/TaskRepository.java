package com.runz.pmtool.repositories;

import java.util.Date;
import java.util.List;

import com.runz.pmtool.customResponse.StatisticsResponse.AggregateSum;
import com.runz.pmtool.domain.Task;
import com.runz.pmtool.domain.Task.TaskStatus;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long>{

    List<Task> findByProjectIdentifierOrderByPostDate(String id);
    
    List<Task> findByProjectIdentifierAndStatus(String id, TaskStatus status);

    Task findByProjectSquence(String squence);

    @Query("Select SUM(t.value) AS sum, DAY(t.postDate) AS group, t.type AS type FROM Task AS t WHERE t.user.id = :userId AND t.type = 'INCOME' AND t.status = :status AND MONTH(t.postDate) = MONTH(:date) GROUP BY DAY(t.postDate)")
    List<AggregateSum> findMonthlyIncomeSumByUserGroupByDayList(@Param("userId") Long userId, @Param("status") TaskStatus status, @Param("date") Date date);

    @Query("Select SUM(t.value) AS sum, DAY(t.postDate) AS group, t.type AS type FROM Task AS t WHERE t.user.id = :userId AND t.type != 'INCOME' AND t.status = :status AND MONTH(t.postDate) = MONTH(:date) GROUP BY DAY(t.postDate)")
    List<AggregateSum> findMonthlyExpenseSumByUserGroupByDayList(@Param("userId") Long userId, @Param("status") TaskStatus status, @Param("date") Date date);

    @Query("Select SUM(t.value) AS sum, DAY(t.postDate) AS group, t.type AS type FROM Task AS t WHERE t.user.id = :userId AND t.type != 'INCOME' AND t.status = :status AND MONTH(t.postDate) = MONTH(:date) GROUP BY t.type")
    List<AggregateSum> findMonthlyExpenseSumByUserGroupByTypeList(@Param("userId") Long userId, @Param("status") TaskStatus status, @Param("date") Date date);

    @Query("Select SUM(t.value) FROM Task AS t WHERE t.user.id = :userId AND t.type = 'INCOME' AND t.status = :status AND MONTH(t.postDate) = MONTH(:date) GROUP BY DAY(t.user.id)")
    Double findMonthlyIncomeSumByUser(@Param("userId") Long userId, @Param("status") TaskStatus status, @Param("date") Date date);

    @Query("Select SUM(t.value) FROM Task AS t WHERE t.user.id = :userId AND t.type != 'INCOME' AND t.status = :status AND MONTH(t.postDate) = MONTH(:date) GROUP BY DAY(t.user.id)")
    Double findMonthlyExpenseSumByUser(@Param("userId") Long userId, @Param("status") TaskStatus status, @Param("date") Date date);
}
