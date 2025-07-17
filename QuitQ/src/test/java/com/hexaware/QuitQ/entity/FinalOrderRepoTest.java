package com.hexaware.QuitQ.entity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FinalOrderRepoTest {

    @Autowired
    private FinalOrderRepo finalOrderRepo;

    @Test
    void testFinalOrderRepoIsNotNull() {
        assertNotNull(finalOrderRepo, "FinalOrderRepo should not be null");
    }
}
