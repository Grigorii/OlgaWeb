package com.kolev.olgaweb;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;

/**
 * Created by Grigoriy on 15.03.2015.
 *
 * class for cropping image
 */
public class ImageCropper {

    static final double k = 0.6667;

    public static void main(String[] args)
    {


        Path sourceDir = Paths.get("h:\\work\\OlgaWeb\\web\\img");
        Path destDir = Paths.get("h:\\work\\OlgaWeb\\web\\img\\small");



        try (DirectoryStream<Path> stream = Files.newDirectoryStream(sourceDir)){
            for (Path file: stream) {
                if(!file.toFile().isDirectory() ) {

                    BufferedImage image = ImageIO.read(file.toFile());
                    int newHeight = new Double(image.getWidth()*k).intValue();

                    BufferedImage newImage = null;
                    if (newHeight < image.getHeight()){
                        newImage = image.getSubimage(0, (image.getHeight() - newHeight) / 2,  image.getWidth(), newHeight);
                    }else{
                        int newWidth = new Double(image.getHeight()/k).intValue();
                        newImage = image.getSubimage( (image.getWidth() - newWidth) / 2, 0,  newWidth, image.getHeight());
                    }


                    File outputfile = new File(destDir.toFile(), file.getFileName().toString() );
                    ImageIO.write(newImage, "jpg", outputfile);
                }
            }
        } catch (IOException | DirectoryIteratorException x) {
            // IOException can never be thrown by the iteration.
            // In this snippet, it can only be thrown by newDirectoryStream.
            System.err.println(x);
        }
    }
}
