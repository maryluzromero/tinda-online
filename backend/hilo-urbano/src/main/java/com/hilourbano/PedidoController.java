package com.hilourbano;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoRepository pedidoRepository;

    public PedidoController(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping
    public List<Map<String, Object>> listarPedidos() {
        return pedidoRepository.findAll()
            .stream()
            .map(pedido -> Map.<String, Object>of(
                "idPedido", pedido.getIdPedido(),
                "fecha", pedido.getFecha(),
                "total", pedido.getTotal(),
                "usuario", Map.of(
                    "idUsuario", pedido.getUsuario().getIdUsuario(),
                    "nombre", pedido.getUsuario().getNombre(),
                    "correo", pedido.getUsuario().getCorreo()
                )
            ))
            .collect(Collectors.toList());
    }
}