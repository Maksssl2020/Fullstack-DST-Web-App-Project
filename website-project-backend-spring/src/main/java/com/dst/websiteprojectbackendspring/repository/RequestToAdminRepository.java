package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestToAdminRepository extends JpaRepository<RequestToAdmin, Long> {

    @Query("SELECT r FROM RequestToAdmin r WHERE r.isAccepted = false ")
    List<RequestToAdmin> findAllNonHandleRequestsToAdmin();
}
