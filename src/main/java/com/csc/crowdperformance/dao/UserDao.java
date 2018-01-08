package com.csc.crowdperformance.dao;

import com.csc.crowdperformance.model.User;

/**
 * Created by juliechen on 5/22/15.
 */
public interface UserDao {

    User findByUserName(String username);

}