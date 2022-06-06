import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import Purse from "../src/components/Purse";
import fetchMock from "jest-fetch-mock";

const data = {data: {firstName: "12"}};
fetchMock.enableMocks()

describe("Purse", () => {
	it("render Purse", () => {
		render(<Router><Purse /></Router>);
		expect(screen.getByTestId("PurseForm")).toBeInTheDocument();
	});

	it("Purse", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><Purse /></Router>);
        });
		const submitBtn = screen.getByTestId("PurseForm").querySelector(".button");
		fireEvent.click(submitBtn);

        const token = localStorage.getItem('token');
		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/purse", {
			method: "POST",
			body: JSON.stringify({
			  funds: "",
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