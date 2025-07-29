package com.cjv;

import java.util.List;

public class Main {

    public void encodeAndDecodeExample() {
        EncodeAndDecode test = new EncodeAndDecode();
        String originalText = "Christopher Jamie Varughese";
        String encodedText = test.encodeStr(originalText);
        String decodedText = test.decodeStr(encodedText);

        System.out.println(encodedText);
        System.out.println(decodedText);
    }

    public void encryptAndDecryptExample() {
        EncryptAndDecrypt test = new EncryptAndDecrypt("Test Secret Key0");
        String originalText = "Christopher Jamie Varughese";
        String encryptedText = test.encrypt(originalText);
        String decryptedText = test.decrypt(encryptedText);

        System.out.println(encryptedText);
        System.out.println(decryptedText);
    }

    public void readAndWrite() {
        ReadAndWrite test = new ReadAndWrite();
        List<String> result = test.readFile("storage/test.json");
        result.forEach(System.out::println);

        test.writeFile(result.toArray(new String[0]),"storage/test2.json");
    }

    public static void main(String[] args) {
        Main test = new Main();

        test.encodeAndDecodeExample();
        test.encryptAndDecryptExample();
        test.readAndWrite();
    }
}