package com.devfreela.repository;

import com.devfreela.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByReviewedId(Long reviewedId);
    List<Review> findByReviewerId(Long reviewerId);
    List<Review> findByProjectId(Long projectId);
}
