import { PriorityType, ProgressType } from '../types/todo';

export const getProgressColor = (progress: ProgressType) => {
  switch (progress) {
    case "TODO":
      return "default"
    case "IN_PROGRESS":
      return "primary"
    case "ALMOST_DONE":
      return "info"
    case "DONE":
      return "success"
    case "STOPPING":
      return "warning"
  }
}

export const getPriorityColor = (priority: PriorityType) => {
  switch (priority) {
    case "A":
      return "error"
    case "B":
      return "warning"
    case "C":
      return "info"
  }
}