package com.cjv;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class EncodeAndDecode {
    Base64.Encoder encoder;
    Base64.Decoder decoder;


    public EncodeAndDecode() {
        this.encoder = Base64.getEncoder();
        this.decoder = Base64.getDecoder();
    }

    public String encodeStr(String plaintext) {
        return encoder.encodeToString(plaintext.getBytes(StandardCharsets.UTF_8));
    }

    public String decodeStr(String encodedtext) {
        return new String(decoder.decode(encodedtext));
    }
}
