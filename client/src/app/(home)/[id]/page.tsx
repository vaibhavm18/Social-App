"use client";
import Post from "@/components/Post";
import { useParams } from "next/navigation";

export default function Posts() {
  const { id } = useParams();

  return <Post />;
}
