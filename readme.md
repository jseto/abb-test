# ABB Frontend Assignment 

## Architecture

The global architecture can be divided in 3 main responsibilities. The **data source** management, the **business logic** and the **user interface**.

Every responsibility is fully decoupled and the communication between each layer is carried on using the _observer pattern_.

### Data Source

Although it is not stated in the requirements document, I assumed the data is received via a sort of socket data stream. In this way, the app doesn't need to constantly poll the devices for a new produced part. Anyway, this decision is irrelevant as the concrete implementation of the data source can be easily changed because there is a façade interface represented by the abstract class **DataStream**

The **DataStream** class states a contract on how concrete data streams should be used by the rest of the application. This contract is enforced by an _observer pattern_, allowing consumers (i.e. the business logic module) to subscribe to be notified every time a part is received.

### Business Logic

The business logic responsibility is managed by the **PartController** class. This class keeps the _unique source of truth_ and process the data. In this app, the only processing is the calculation of the total accumulated deviation of every control. Again, the _observer pattern_ is used to notify consumers (i.e. user interface) when the processing has finished and the part is ready to be consumed (i.e. shown to the user).

The **PartController** class has been designed as a _singleton_ to keep data immutable. Additionally, it provides a mechanism to register a factory to instantiate the concrete implementation of the data stream (**MockDatastream** class). In this way, the concrete implementation will be automatically injected in the **PartController** constructor at the first instantiation. This mechanism provides an elegant and easy to use way to decouple the data stream through dependency injection.

### User Interface

The technology chosen to implement the user interface is **Preact**. **Preact** is a homomorphic library to **React** but weighing only 3.5Kb compared to >100Kb of **React**. Being homomorphic means that the API interface is equivalent and the usage doesn't change from the original **React** way. The selection of the technology is again irrelevant as it can be easily replaced by any other technology or even vanilla JS as the business logic is fully decoupled.

The main component is the **PartPanel**. The component state is driven by subscribing to the **PartController** _new part_ event. The subscription is done in the `useEffect` hook. Every time a new part is processed, the component state will change with the new part received in the event.

The layout has been done using the CSS Flex specification. Although the implementation is responsive, it is not fully optimized, as empty spaces can appear in the main panel. A solution to this could be using a packing algorithm and the use of the CSS Grid elements. As a temporary solution, the _controls_ are shown in groups of 6 which, to an extent, allows the Flex elements to automate the packing of the 6 control panel groups.

Finally, the part conformity, is driven by a tolerance parameter received with the data stream and processed locally in every control. The metrology concepts and acceptance criteria have been chosen arbitrarily and do not reflect a real scenario as this is not the goal of the exercise.

## Install and Run

Having **Node.js** and **Git** installed in the system, simply create a local copy and run it by issuing the following command:

```sh
git clone https://github.com/jseto/abb-test.git
cd abb-test
npm i
npm run dev
```

The app will be available [here](http://localhost:8080/).

If you are unable to see the app in the link above, please check that the 8080 port is not in use by another application.

## Tests

The unit tests have been done using Jest. To run them, type this command:

```sh
npm test
```

The test coverage can be seen [here](./coverage/lcov-report/index.html)

