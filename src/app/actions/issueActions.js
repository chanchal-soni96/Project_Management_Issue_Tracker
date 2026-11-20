"use server";

import { createIssueSchema } from "@/validators/issueSchema";
import { updateTag } from "next/cache";import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function createIssue(prevState, formData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to create an issue.",
    };
  }
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: "OPEN",
  };

  const result = createIssueSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  try {
    const issue = await prisma.issue.create({
      data: {
        ...result.data,
        userId: session.user.id,
      },
    });

    updateTag(`issues-${session.user.id}`);

    console.log("Issue Created:", issue);


    return {
      success: true,
      message: "Issue created successfully!",
      issue: {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        status: issue.status,
        createdAt: issue.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Create Issue Error:", error);

    return {
      success: false,
      message: "Something went wrong while creating the issue.",
    };
  }
}


export async function updateIssue(prevState, formData) {
  const issueId = formData.get("issueId");
  const submittedVersion = Number(formData.get("version"));

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to update an issue.",
    };
  }

  if (!issueId) {
    return {
      success: false,
      message: "Issue ID is required.",
    };
  }

  if (
    !Number.isSafeInteger(submittedVersion) ||
    submittedVersion < 0
  ) {
    return {
      success: false,
      message: "Invalid issue version.",
    };
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const result = createIssueSchema.safeParse({
    ...rawData,
    status: "OPEN",
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  try {
    const existingIssue = await prisma.issue.findFirst({
      where: {
        id: issueId,
        userId: session.user.id,
      },
    });

    if (!existingIssue) {
      return {
        success: false,
        message: "Issue not found or you are not authorized to update it.",
      };
    }

    const updatedIssue = await prisma.issue.updateMany({
      where: {
        id: issueId,
        userId: session.user.id,
        version: submittedVersion,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        version: {
          increment: 1,
        },
      },
    });

    if (updatedIssue.count === 0) {
      return {
        success: false,
        message:
          "This issue was modified by another user. Please refresh and try again.",
      };
    }

    updateTag(`issues-${session.user.id}`);

    return {
      success: true,
      message: "Issue updated successfully!",
    };
  } catch (error) {
    console.error("Update Issue Error:", error);

    return {
      success: false,
      message: "Failed to update issue.",
    };
  }
}


export async function deleteIssue(prevState, formData) {
  const issueId = formData.get("issueId");

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to delete an issue.",
    };
  }

  if (!issueId) {
    return {
      success: false,
      message: "Issue ID is required.",
    };
  }

  try {
    const existingIssue = await prisma.issue.findFirst({
      where: {
        id: issueId,
        userId: session.user.id,
      },
    });

    if (!existingIssue) {
      return {
        success: false,
        message: "Issue not found or you are not authorized to delete it.",
      };
    }

    await prisma.issue.delete({
      where: {
        id: issueId,
      },
    });
    updateTag(`issues-${session.user.id}`);

    return {
      success: true,
      message: "Issue deleted successfully!",
    };
  } catch (error) {
    console.error("Delete Issue Error:", error);

    return {
      success: false,
      message: "Failed to delete issue.",
    };
  }
}
