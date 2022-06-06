import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import Edit from "../src/components/Edit";
import fetchMock from "jest-fetch-mock";

const data = {data: {firstName: "12"}};
fetchMock.enableMocks()

describe("Edit", () => {
	it("render Edit", () => {
		render(<Router><Edit /></Router>);
		expect(screen.getByTestId("EditForm")).toBeInTheDocument();
	});

	it("Edit", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><Edit /></Router>);
        });
		const submitBtn = screen.getByTestId("EditForm").querySelector(".button");
		fireEvent.click(submitBtn);

        const token = localStorage.getItem('token');
		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/user/1", {
			method: "PUT",
			body: JSON.stringify({
			  firstName: ""
			}),
            headers: {'Accept': 'application/json',
		    'Authorization': 'Bearer '+ token
		    }
		});
		await expect(fetch).toHaveBeenCalledTimes(1);
	});
});