package com.hexaware.QuitQ.entity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReviewRepoTest {

    @Autowired
    private ReviewRepo reviewRepo;

    @Test
    void testReviewRepoIsNotNull() {
        assertNotNull(reviewRepo, "ReviewRepo should not be null");
    }
}
