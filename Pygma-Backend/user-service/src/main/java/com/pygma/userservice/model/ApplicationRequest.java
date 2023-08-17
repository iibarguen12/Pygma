package com.pygma.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationRequest {
    @NonNull
    private String applicationData;
    @NonNull
    private String applicationStatus;
}
