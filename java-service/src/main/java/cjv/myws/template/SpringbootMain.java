package cjv.myws.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(scanBasePackages={"cjv.myws.template"})
public class SpringbootMain extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(SpringbootMain.class, args);
	}
}
