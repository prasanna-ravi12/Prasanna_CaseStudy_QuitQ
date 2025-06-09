package com.quitq.entity;

public class AuditLog {
    private int logId;
    private int adminId;
    private String action;
    private String targetType;
    private int targetId;
    private String actionTime;

    public AuditLog() {}

    public AuditLog(int logId, int adminId, String action, String targetType, int targetId, String actionTime) {
        this.logId = logId;
        this.adminId = adminId;
        this.action = action;
        this.targetType = targetType;
        this.targetId = targetId;
        this.actionTime = actionTime;
    }

    public int getLogId() { return logId; }
    public void setLogId(int logId) { this.logId = logId; }

    public int getAdminId() { return adminId; }
    public void setAdminId(int adminId) { this.adminId = adminId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }

    public int getTargetId() { return targetId; }
    public void setTargetId(int targetId) { this.targetId = targetId; }

    public String getActionTime() { return actionTime; }
    public void setActionTime(String actionTime) { this.actionTime = actionTime; }
}
