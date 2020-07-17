package com.runz.pmtool.repositories;

import java.util.List;

import com.runz.pmtool.customResponse.StatisticsResponse.MonthlySum;
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
    
    @Query("Select SUM(t.value) AS sum, MONTH(t.postDate) AS month FROM Task AS t WHERE t.user.id = :userId AND t.status = :status GROUP BY MONTH(t.postDate)")
    List<MonthlySum> findSumByUserGroupByMonthList(@Param("userId") Long userId, @Param("status") TaskStatus status);
}
