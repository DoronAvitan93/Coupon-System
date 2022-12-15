package com.CouponsProject.controller;


//using ErrorDetails class for controller advises
public class ErrorDetails {

    private String key;
    private String value;

    public ErrorDetails() {
    }

    public ErrorDetails(String key, String value) {
        super();
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
