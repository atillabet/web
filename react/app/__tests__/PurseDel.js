import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import PurseDel from "../src/components/PurseDel";
import fetchMock from "jest-fetch-mock";

const data = {data: {firstName: "12"}};
fetchMock.enableMocks()

describe("PurseDel", () => {
	it("render PurseDel", () => {
		render(<Router><PurseDel /></Router>);
		expect(screen.getByTestId("PurseDelForm")).toBeInTheDocument();
	});

	it("PurseDel", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><PurseDel /></Router>);
        });
		const submitBtn = screen.getByTestId("PurseDelForm").querySelector(".button");
		fireEvent.click(submitBtn);

        const token = localStorage.getItem('token');
		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/purse", {
			method: "DELETE",
			body: JSON.stringify({
			  name: "",
			  userId: null
			}),
            headers: {'Accept': 'application/json',
		    'Authorization': 'Bearer '+ token
		    }
		});
		await expect(fetch).toHaveBeenCalledTimes(1);
	});
});