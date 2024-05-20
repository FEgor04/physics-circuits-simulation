package org.circuisim.web.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.circuisim.rSocket.data.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rSocket")
@Tag(name = "DO NOT USE!")
public class RSocketFakeController {
    @GetMapping("")
    @Schema()
    public Message doNothing() {

        return new Message();
    }

}
