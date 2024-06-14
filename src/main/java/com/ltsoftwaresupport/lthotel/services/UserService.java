package com.ltsoftwaresupport.lthotel.services;

import com.ltsoftwaresupport.lthotel.data.User;
import com.ltsoftwaresupport.lthotel.data.UserRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Optional<User> get(Long id) {
        return repository.findById(id);
    }

    public User update(User entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Page<User> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<User> list(Pageable pageable, Specification<User> filter) {
        return repository.findAll(filter, pageable);
    }

    public List<User> listAll() {
        return repository.findAll();
    }

    public int count() {
        return (int) repository.count();
    }

    public User save(User entity) {
        return repository.save(entity);
    }
}
