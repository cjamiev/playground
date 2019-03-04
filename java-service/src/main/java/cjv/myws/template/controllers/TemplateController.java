package cjv.myws.template.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cjv.myws.template.models.TemplateModel;
import cjv.myws.template.services.TemplateService;
import cjv.myws.template.models.MyResponseModel;

@RestController
@RequestMapping("/api/template")
public class TemplateController {
	
	@Autowired 
	private TemplateService templateService; 
	
	@RequestMapping(value="/createTemplate",method = RequestMethod.POST)
	public @ResponseBody TemplateModel templatePost(@RequestBody TemplateModel in) {
		templateService.createTemplate(in);
		return in;
	}
	
	@RequestMapping(value="/getAllTemplates",method = RequestMethod.GET) 
	public MyResponseModel templateGet() {
		return templateService.getAllTemplates();
	}
	
		@RequestMapping(value="/updateTemplate/{id}",method = RequestMethod.PUT)
	public void templatePut(@PathVariable String name,@RequestBody TemplateModel in) {
		templateService.updateTemplate(name,in);
	}
	
	@RequestMapping(value="/deleteTemplate/{name}",method = RequestMethod.DELETE)
	public void templateDelete(@PathVariable String name) {
		templateService.deleteTemplate(name);
	}
}
