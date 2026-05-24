import { useEffect, useState } from "react";
import { projects as fallbackProjects, type Project } from "@/data/projects";

const isProjectList = (value: unknown): value is Project[] => Array.isArray(value);

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/projects.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Projects JSON not found");
        }

        return response.json();
      })
      .then((data) => {
        if (isMounted && isProjectList(data)) {
          setProjects(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProjects(fallbackProjects);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, isLoading };
};
