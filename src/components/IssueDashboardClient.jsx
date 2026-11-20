
"use client";

import { useOptimistic } from "react";
import IssueForm from "@/components/IssueForm";
import EditIssueForm from "@/components/EditIssueForm";
import DeleteIssueButton from "@/components/DeleteIssueButton";

export default function IssueDashboardClient({ initialIssues }) {
  const [optimisticIssues, addOptimisticIssue] = useOptimistic(
    initialIssues,
    (currentIssues, newIssue) => {
      return [...currentIssues, newIssue];
    }
  );

  const stats = [
    {
      label: "Total Issues",
      count: optimisticIssues.length,
      style: "stat-total",
      icon: "▤",
    },
    {
      label: "Open",
      count: optimisticIssues.filter(
        (issue) => issue.status === "OPEN"
      ).length,
      style: "stat-open",
      icon: "◉",
    },
    {
      label: "In Progress",
      count: optimisticIssues.filter(
        (issue) => issue.status === "IN_PROGRESS"
      ).length,
      style: "stat-progress",
      icon: "◷",
    },
    {
      label: "Closed",
      count: optimisticIssues.filter(
        (issue) => issue.status === "CLOSED"
      ).length,
      style: "stat-closed",
      icon: "✓",
    },
  ];

  return (
    <>
      <section className="panel">
        <h2>Create New Issue</h2>

        <IssueForm addOptimisticIssue={addOptimisticIssue} />
      </section>

      <section className="panel">
        <h2>All Issues</h2>

        <div className="issue-dashboard-content">
          <div className="issue-stats">
            {stats.map((stat) => (
              <div
                className={`stat-card ${stat.style}`}
                key={stat.label}
              >
                <div className="stat-card-top">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-icon">{stat.icon}</span>
                </div>

                <h3 className="stat-count">{stat.count}</h3>
              </div>
            ))}
          </div>

          <div className="issue-list">
            {optimisticIssues.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">▤</span>
                <h3>No issues yet</h3>
                <p>Create your first issue using the form.</p>
              </div>
            ) : (
              optimisticIssues.map((issue) => (
                <div key={issue.id} className="issue-card">
                  <div className="issue-card-heading">
                    <h3 className="issue-title">{issue.title}</h3>

                    <span
                      className={`status-badge ${
                        issue.status === "OPEN"
                          ? "status-open"
                          : issue.status === "IN_PROGRESS"
                            ? "status-progress"
                            : "status-closed"
                      }`}
                    >
                      {issue.status.replace("_", " ")}
                    </span>
                  </div>

                  <p className="issue-description">
                    {issue.description}
                  </p>

                  <div className="issue-meta">
                    <span>
                      Created{" "}
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="issue-actions">
                    <EditIssueForm issue={issue} />
                    <DeleteIssueButton issueId={issue.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
