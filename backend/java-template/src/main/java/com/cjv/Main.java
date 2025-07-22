package com.cjv;

public class Main {
    public void encodeAndDecodeExample() {
        EncodeAndDecode test = new EncodeAndDecode();
        String originalText = "Christopher Jamie Varughese";
        String encodedText = test.encodeStr(originalText);
        String decodedText = test.decodeStr(encodedText);

        System.out.println(encodedText);
        System.out.println(decodedText);
    }

    public static void main(String[] args) {
        Main test = new Main();

        test.encodeAndDecodeExample();
    }
}