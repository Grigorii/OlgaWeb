package com.kolev.olgaweb;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

/**
 * Created by Grigoriy on 26.07.2015.
 */
public class ImageStorage {

    private static ImageStorage instance = null;

    private Map<String, List<String>> storage;

    public static ImageStorage getInstance()
    {
        if (instance == null)
        {
            instance = new ImageStorage();
        }

        return instance;
    }

    private  ImageStorage()
    {
        storage = new  HashMap<>();
        load();
    }

    public void print()
    {
        Set<String> files = storage.keySet();
        for(String cath : files)
        {
            for(String file: storage.get(cath))
            {
                System.out.println(String.format("%s: %s", cath, file));
            }
        }
    }
    
    public static void main(String[] args)
    {
        new ImageStorage().print();
    }

    private void load()
    {
        try {
            Files.walk(Paths.get("img/small")).filter(Files::isDirectory).forEach(path -> {

                List<String> files = new ArrayList<>();
                storage.put(path.toString(), files);

                try {
                    Files.walk(path).filter(Files::isRegularFile).forEach(filePath -> files.add(filePath.toString()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });

        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
