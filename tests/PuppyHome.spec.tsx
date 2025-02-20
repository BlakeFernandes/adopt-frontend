import Home from "@/app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockPuppies = [
  {
    _id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
    photoUrl: "https://example.com/buddy.jpg",
    traits: ["Friendly", "Playful"],
  },
  {
    _id: "2",
    name: "Luna",
    breed: "Labrador Retriever",
    age: 3,
    photoUrl: "https://example.com/luna.jpg",
    traits: ["Loyal", "Energetic"],
  },
];

const server = setupServer(
  http.get(`http://localhost:3000/puppies`, () => {
    return HttpResponse.json(mockPuppies);
  }),
  http.get(`http://localhost:3000/puppies/filters`, () => {
    return HttpResponse.json({});
  })
);

describe("Puppy Home Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("renders puppy data correctly", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText("Buddy")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Luna")).toBeInTheDocument());

    expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
    expect(screen.getByText("Labrador Retriever")).toBeInTheDocument();
    expect(screen.getByText("2 years old")).toBeInTheDocument();
    expect(screen.getByText("3 years old")).toBeInTheDocument();
    expect(screen.getByText("Friendly, Playful")).toBeInTheDocument();
    expect(screen.getByText("Loyal, Energetic")).toBeInTheDocument();
  });
});
