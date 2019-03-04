package cjv.myws.template.models;

public class MyResponseModel {
  private String data;
  private String message;
  private int code;

  public MyResponseModel() {
  }

  public MyResponseModel(String data, String message, int code) {
    super();
    this.data = data;
    this.message = message;
    this.code = code;
  }

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public int getCode() {
    return code;
  }

  public void setCode(int code) {
    this.code = code;
  }
}
