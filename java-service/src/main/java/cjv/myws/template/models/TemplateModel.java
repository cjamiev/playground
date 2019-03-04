package cjv.myws.template.models;

import java.util.ArrayList;
import java.util.List;

public class TemplateModel {
	private int id;
	private String name;
	private boolean flag;
	private double value;
	private List<String> list;
	
	public TemplateModel(){
	}
	
	public TemplateModel(int id, String name){
		super();
		this.id = id;
		this.name = name;
	}
	
	public TemplateModel(int id, String name, boolean flag, double value, ArrayList<String> list){
		super();
		this.id = id;
		this.name = name;
		this.flag = flag;
		this.value = value;
		this.list = list;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getFlag() {
		return flag;
	}

	public void setFlag(boolean flag) {
		this.flag = flag;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public List<String> getList() {
		return list;
	}

	public void setList(ArrayList<String> list) {
		this.list = list;
	}
	
	public String toJSONString() {
	    return "{"
	      + "\"name\":"+"\""+name+"\","
	      + "\"id\":"+"\""+id+"\""
	    +"}";
	  }
	
	public String toString(){
		return "id: " + id + " name: " + name + " flag:" + flag + " value:" + value + " list:" + list;
	}

}
