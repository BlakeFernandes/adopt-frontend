import FilterControls from "@/components/FilterControls";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockBreeds = {
  breeds: ["Golden Retriever", "Labrador Retriever"],
};

const server = setupServer(
  http.get(`http://localhost:3000/puppies/filters`, () => {
    return HttpResponse.json(mockBreeds);
  })
);

describe("FilterControls Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("renders breed filter list", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <FilterControls
          searchQuery=""
          setSearchQuery={() => {}}
          filters={{ breed: "", age: "", size: "", gender: "" }}
          setFilters={() => {}}
        />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(
        screen.getByRole("option", { name: "Golden Retriever" })
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByRole("option", { name: "Labrador Retriever" })
      ).toBeInTheDocument()
    );
  });
});
