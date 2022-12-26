package jp.co.internous.ecsite.model.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="goods")
public class Goods {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="goods_name")
	private String goodsName;
	
	@Column(name="price")
	private long price;
	
	@Column(name="update_at")
	private Timestamp updatedAt;

	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getGoodsName() {
		return goodsName;
	}
	
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	
	public long getPrice() {
		return price;
	}
	
	public void setPrice(long price) {
		this.price = price;
	}
	
	public Timestamp getUpdatedAt() {
		return updatedAt;
	}
	
	public void setUpdatedAt(Timestamp updatedAt) {
		this.updatedAt = updatedAt;
	}

}
