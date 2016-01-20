
//keep track of how many ANDs we need
$counterRoom = 0;
 //check and append room
if($kitchen === "true")){
			$queryString = $queryString . " ("; // we append ( because order of operations, we know this is the first possible room
			$queryString = $queryString . " WHERE category = 'Kitchen' OR WHERE title LIKE '%kitchen%'";
			if($counterRoom > 0)
				$queryString = $queryString . " OR";
			$counterRoom += 1;
		}
if($livingRoom === "true")){
			if($counterRoom > 0)
				$queryString = $queryString . " (";
			$queryString = $queryString . " WHERE category = 'LivingRoom' OR WHERE title LIKE '%livingRoom%'";
			if($counterRoom > 0)
				$queryString = $queryString . " OR";
				$counterRoom += 1;

		}
if($bedroom === "true")){
			if($counterRoom > 0)
				$queryString = $queryString . " (";
			$queryString = $queryString . " WHERE category = 'Bedroom' OR WHERE title LIKE '%bedroom%'";
			if($counterRoom > 0)
				$queryString = $queryString . " OR";
				$counterRoom += 1;

		}
if($bathroom === "true")){
			if($counterRoom > 0)
				$queryString = $queryString . " (";
			$queryString = $queryString . " WHERE category = 'Bathroom' OR WHERE title LIKE '%bathroom%'";
				if($counterRoom > 0)
				$queryString = $queryString . " OR";
				$counterRoom += 1;

		}
if($electronics === "true")){
			if($counterRoom > 0)
				$queryString = $queryString . " (";
			$queryString = $queryString . " WHERE category = 'Electronics' OR WHERE title LIKE '%electronics%'";
			$counterRoom += 1;
		}

	if($counterRoom > 0)
				$queryString = $queryString . " )"; // we don't append OR because this is the last room

	//Check and append condition


$counterCond = 0;

if($new === "true")){
				if ($counterRoom > 0)
					$queryString = $queryString . " AND (";
			$queryString = $queryString . " WHERE category = 'New' ";
			if($counterCond > 0)
				$queryString = $queryString . " OR";
			$counterCond += 1;
		}
if($likeNew === "true")){
				if ($counterRoom > 0 && $counterCond < 1)
					$queryString = $queryString . " AND ( ";
			$queryString = $queryString . " WHERE category = 'LikeNew' ";
			if($counterCond > 0)
				$queryString = $queryString . " OR";
			$counterCond += 1;
		}
if($gentlyUsed === "true")){
			if ($counterRoom > 0 && $counterCond < 1)
					$queryString = $queryString . " AND (";
			$queryString = $queryString . " WHERE category = 'GentlyUsed' ";
			if($counterCond > 0)
				$queryString = $queryString . " OR";
			$counterCond += 1;
		}
if($poor === "true")){
			if ($counterRoom > 0 && $counterCond < 1)
					$queryString = $queryString . " AND (";
			$queryString = $queryString . " WHERE category = 'Poor' ";
			if($counterCond > 0)
				$queryString = $queryString . " OR";
			$counterCond += 1;
		}
if($broken === "true")){
			if ($counterRoom > 0 && $counterCond < 1)
					$queryString = $queryString . " AND (";
			$queryString = $queryString . " WHERE category = 'BrokenShit' ";
			if($counterCond > 0)
				$queryString = $queryString . " )";
			$counterCond += 1;
		}
