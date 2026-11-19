package com.hilourbano;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/detalles-pedido")
public class DetallePedidoController {

    private final DetallePedidoRepository detallePedidoRepository;

    public DetallePedidoController(
            DetallePedidoRepository detallePedidoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
    }

    @GetMapping
    public List<Map<String, Object>> listarDetalles() {
        return detallePedidoRepository.findAll()
            .stream()
            .map(detalle -> Map.<String, Object>of(
                "idDetalle", detalle.getIdDetalle(),
                "cantidad", detalle.getCantidad(),
                "precioUnitario", detalle.getPrecioUnitario(),
                "pedido", Map.of(
                    "idPedido", detalle.getPedido().getIdPedido()
                ),
                "camisa", Map.of(
                    "idCamisa", detalle.getCamisa().getIdCamisa(),
                    "nombre", detalle.getCamisa().getNombre(),
                    "talla", detalle.getCamisa().getTalla(),
                    "color", detalle.getCamisa().getColor()
                )
            ))
            .collect(Collectors.toList());
    }
}