package com.featureflags.exception;

public class FeatureFlagException extends RuntimeException {
    public FeatureFlagException(String message) {
        super(message);
    }
}
