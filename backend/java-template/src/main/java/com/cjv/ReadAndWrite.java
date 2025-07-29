package com.cjv;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ReadAndWrite {

    public ReadAndWrite() {}

    public List<String> readFile(String filename) {
        List<String> contents = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                contents.add(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }

        return contents;
    }

    public void writeFile(String[] contents, String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            writer.write(String.join(System.lineSeparator(), contents));
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }
    }
}