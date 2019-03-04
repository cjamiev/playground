package cjv.myws.template.services;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Value;

import cjv.myws.template.models.TemplateModel;
import cjv.myws.template.models.MyResponseModel;


@Service
public class TemplateService {

	@Value("${jdbc.url}")
	private String URL;

	private Connection connect() {
		Connection conn = null;

		try {
			Class.forName("org.sqlite.JDBC");
			conn = DriverManager.getConnection(URL);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}

		return conn;
	}

	public MyResponseModel createTemplate(TemplateModel templateModel) {
		String templateSql = "INSERT INTO template (name,id) VALUES(?,?)";
		Connection conn = this.connect();
		MyResponseModel responseModel;

		try (PreparedStatement pstmt = conn.prepareStatement(templateSql)) {
			pstmt.setString(1, templateModel.getName());
			pstmt.setInt(2, templateModel.getId());
			pstmt.executeUpdate();
			responseModel = new MyResponseModel(templateModel.toJSONString(), "Successfully added new entry:" + templateModel.getName(), 0);
		} catch (SQLException e) {
			responseModel = new MyResponseModel(templateModel.toJSONString(),
					"Name:" + templateModel.getName() + " - " + e.getMessage(), e.getErrorCode());
		} 

		return responseModel;
	}

	public MyResponseModel getAllTemplates() {
		String templateSql = "SELECT * FROM template";
		Connection conn = this.connect();
		TemplateModel templateModel;
		MyResponseModel responseModel;
		StringBuilder templateCollection = new StringBuilder("[");

		try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(templateSql)) {
			while (rs.next()) {
				templateModel = new TemplateModel(rs.getInt("id"), rs.getString("name"));
				templateCollection.append(templateModel.toJSONString() + ",");
			}
			if (templateCollection.length() > 1) {
				templateCollection.setCharAt(templateCollection.length() - 1, ']');
			} else {
				templateCollection.append("]");
			}
			responseModel = new MyResponseModel(templateCollection.toString(), "Successfully found all passwords", 0);
		} catch (SQLException e) {
			responseModel = new MyResponseModel(templateCollection.toString(), e.getMessage(), e.getErrorCode());
		}
		
		return responseModel;
	}

	public MyResponseModel updateTemplate(String name, TemplateModel templateModel) {
		String templateSql = "UPDATE template SET value = ? WHERE name = ?";
		Connection conn = this.connect();
		MyResponseModel responseModel;

		try (PreparedStatement pstmt = conn.prepareStatement(templateSql)) {
			pstmt.setString(1, name);
			pstmt.setString(2, templateModel.getName());
			pstmt.executeUpdate();
			responseModel = new MyResponseModel(name, "Successfully deleted entry:" + name, 0);
		} catch (SQLException e) {
			responseModel = new MyResponseModel(name, "Name:" + name + " - " + e.getMessage(), e.getErrorCode());
		} 
		
		return responseModel;
	}

	public MyResponseModel deleteTemplate(String name) {
		String templateSql = "DELETE FROM template WHERE name = ?";
		Connection conn = this.connect();
		MyResponseModel responseModel;

		try (PreparedStatement pstmt = conn.prepareStatement(templateSql)) {
			pstmt.setString(1, name);
			pstmt.executeUpdate();
			responseModel = new MyResponseModel(name, "Successfully deleted entry:" + name, 0);
		} catch (SQLException e) {
			responseModel = new MyResponseModel(name, "Name:" + name + " - " + e.getMessage(), e.getErrorCode());
		}
		
		return responseModel;
	}

}