package com.featureflags.dto;

import java.util.Objects;

public class ToggleFlagRequest {
    private Boolean enabled;

    public ToggleFlagRequest() {
    }

    public ToggleFlagRequest(Boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public static ToggleFlagRequestBuilder builder() {
        return new ToggleFlagRequestBuilder();
    }

    public static class ToggleFlagRequestBuilder {
        private Boolean enabled;

        ToggleFlagRequestBuilder() {
        }

        public ToggleFlagRequestBuilder enabled(Boolean enabled) {
            this.enabled = enabled;
            return this;
        }

        public ToggleFlagRequest build() {
            return new ToggleFlagRequest(enabled);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ToggleFlagRequest that = (ToggleFlagRequest) o;
        return Objects.equals(enabled, that.enabled);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enabled);
    }

    @Override
    public String toString() {
        return "ToggleFlagRequest{" +
                "enabled=" + enabled +
                '}';
    }
}
