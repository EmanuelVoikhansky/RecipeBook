import { useState, useEffect } from "react";

const SERVER_URL = window.location.origin.includes("localhost")
  ? "http://localhost:8080/graphql"
  : window.location.origin + "/graphql";

async function fetchGraphQL(text, variables, headers) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

/**
 * Used to send queries/mutations to the server.
 * Inputs:
 *  query: graphQL query or mutation string with potential variable placeholders
 *  variables: object matching the placeholders in the query if any. Optional.
 *  onComplete: gets the raw response object, do something. Optional.
 *  onError: gets the error object if any. Optional. Defaults to a console.error log.
 * Returns:
 *  [queryResponseData, isQueryLoading, reloadQueryNow()]
 *  Important: query will run once when useQuery is called. To call again you MUST
 *  use the reloadQueryNow() method returned.
 **/
export default function useQuery(
  query,
  variables,
  onComplete,
  onError,
  headers
) {
  const [requestStatus, setRequestStatus] = useState({
    inFlight: true,
  });
  const [reload, setReload] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setRequestStatus({
      inFlight: true,
    });
    fetchGraphQL(query, variables, headers ?? {})
      .then((response) => {
        if (!isMounted) {
          // if component already deleted, do not update state
          setRequestStatus({
            inFlight: false,
          });
          return;
        }
        onComplete && onComplete(response);
        setRequestStatus({
          inFlight: false,
          data: response.data,
        });
      })
      .catch((error) => {
        onError ? onError(error) : console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, [reload]);
  return [requestStatus.data, requestStatus.inFlight, () => setReload(!reload)];
}
