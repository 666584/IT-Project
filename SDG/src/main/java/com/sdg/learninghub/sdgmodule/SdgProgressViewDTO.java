package com.sdg.learninghub.sdgmodule;

import lombok.Getter;

@Getter
public class SdgProgressViewDTO {
	private boolean overview;
    private boolean targets;
    private boolean progress;
    
    public SdgProgressViewDTO(boolean overview, boolean targets, boolean progress) {
        this.overview = overview;
        this.targets = targets;
        this.progress = progress;
    }
}
