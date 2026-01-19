package com.featureflags.dto;

import java.util.Objects;

public class FeatureFlagRequest {
    private String key;
    private String description;
    private Boolean enabled;

    public FeatureFlagRequest() {
    }

    public FeatureFlagRequest(String key, String description, Boolean enabled) {
        this.key = key;
        this.description = description;
        this.enabled = enabled;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public static FeatureFlagRequestBuilder builder() {
        return new FeatureFlagRequestBuilder();
    }

    public static class FeatureFlagRequestBuilder {
        private String key;
        private String description;
        private Boolean enabled;

        FeatureFlagRequestBuilder() {
        }

        public FeatureFlagRequestBuilder key(String key) {
            this.key = key;
            return this;
        }

        public FeatureFlagRequestBuilder description(String description) {
            this.description = description;
            return this;
        }

        public FeatureFlagRequestBuilder enabled(Boolean enabled) {
            this.enabled = enabled;
            return this;
        }

        public FeatureFlagRequest build() {
            return new FeatureFlagRequest(key, description, enabled);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeatureFlagRequest that = (FeatureFlagRequest) o;
        return Objects.equals(key, that.key) && Objects.equals(description, that.description) && Objects.equals(enabled, that.enabled);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key, description, enabled);
    }

    @Override
    public String toString() {
        return "FeatureFlagRequest{" +
                "key='" + key + '\'' +
                ", description='" + description + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
