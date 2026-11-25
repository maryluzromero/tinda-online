package com.hilourbano;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/camisas")
public class CamisaController {

    private final CamisaRepository camisaRepository;

    public CamisaController(CamisaRepository camisaRepository) {
        this.camisaRepository = camisaRepository;
    }

    @GetMapping
    public List<Camisa> listarCamisas() {
        return camisaRepository.findAll();
    }
}