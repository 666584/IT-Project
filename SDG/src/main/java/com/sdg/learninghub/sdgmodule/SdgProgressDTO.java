package com.sdg.learninghub.sdgmodule;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SdgProgressDTO {

    @JsonProperty("accessToken")
    private String accessToken;

    @JsonProperty("goalTitle")
    private String goalTitle;
    
    @JsonProperty("goalTask")
    private String goalTask;

}