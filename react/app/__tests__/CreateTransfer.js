import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import TransferCreate from "../src/components/TransferCreate";
import fetchMock from "jest-fetch-mock";

const data = {data: {firstName: "12"}};
fetchMock.enableMocks()

describe("TransferCreate", () => {
	it("render TransferCreate", () => {
		render(<Router><TransferCreate /></Router>);
		expect(screen.getByTestId("TransferCreateForm")).toBeInTheDocument();
	});

	it("TransferCreate", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><TransferCreate /></Router>);
        });
		const submitBtn = screen.getByTestId("TransferCreateForm").querySelector(".button");
		fireEvent.click(submitBtn);

        const token = localStorage.getItem('token');
		await expect(fetch).toHaveBeenCalledWith('http://localhost:5000/transfer', {
			method: "POST",
			body: JSON.stringify({
			    nameSender: "",
	            nameRreciever: "",
	            quanityFunds: ""
			}),
            headers: {'Accept': 'application/json',
		    'Authorization': 'Bearer '+ token
		    }
		});
		await expect(fetch).toHaveBeenCalledTimes(1);
	});
});