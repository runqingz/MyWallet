package com.runz.pmtool.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ItemTag {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

}