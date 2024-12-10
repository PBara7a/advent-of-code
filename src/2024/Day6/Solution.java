package Day6;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class Solution {

	public static void main(String[] args) throws IOException {
		List<String> lines = Files.readAllLines( Paths.get("src/2024/Day6/input.txt") );

		List<List<String>> map = createMap( lines );

		System.out.printf( "Part A: %d%n",  predictGuardRoute( map, false ).visited() );
		System.out.printf( "Part B: %d%n",  countPossibleObstaclePositions( map ) );
	}

	private static List<List<String>> createMap( List<String> lines ) {
		return lines.stream()
				.map( line -> List.of( line.split( "" ) ) )
				.collect( Collectors.toList() );
	}

	private static Coordinate findStartPosition( List<List<String>> map ) {
		for ( int row = 0; row < map.size(); row++ ) {
			for ( int col = 0; col < map.getFirst().size(); col++ ) {
				if ( "^".equals( map.get( row ).get( col ) ) ) {
					return new Coordinate( row, col );
				}
			}
		}
		return new Coordinate( 0, 0 );
	}

	private static boolean isOutOfBounds( List<List<String>> map, Coordinate coord ) {
		return coord.getRow() < 0 || coord.getRow() >= map.size() || coord.getCol() < 0
				|| coord.getCol() >= map.getFirst().size();
	}

	private static Coordinate calculateNextPosition( Coordinate current, Direction direction ) {
		return new Coordinate( current.getRow() + direction.getRowDelta(),
				current.getCol() + direction.getColDelta() );
	}

	private static boolean isObstacleInCoordinate( List<List<String>> map, Coordinate coord ) {
		return "#".equals( map.get( coord.getRow() ).get( coord.getCol() ) );
	}

	private static GuardRouteReport predictGuardRoute( List<List<String>> map, boolean trackDirection ) {
		Coordinate currentPosition = findStartPosition( map );
		Direction currentDirection = Direction.UP;

		Set<Coordinate> visitedCoordinates = new HashSet<>();
		Set<DirectionalCoordinate> visitedDirectional = new HashSet<>();
		boolean isInALoop = false;

		while ( true ) {
			if ( trackDirection ) {
				DirectionalCoordinate currentDirectional = new DirectionalCoordinate(
						currentPosition.getRow(), currentPosition.getCol(), currentDirection.name() );

				if ( visitedDirectional.contains( currentDirectional ) ) {
					isInALoop = true;
					break;
				}
				visitedDirectional.add( currentDirectional );
			} else {
				visitedCoordinates.add( currentPosition );
			}

			Coordinate nextCoord = calculateNextPosition( currentPosition, currentDirection );

			if ( isOutOfBounds( map, nextCoord ) ) {
				break;
			}

			if ( isObstacleInCoordinate( map, nextCoord ) ) {
				currentDirection = currentDirection.turnRight();
			} else {
				currentPosition = nextCoord;
			}
		}

		int visitedSize = trackDirection ? visitedDirectional.size() : visitedCoordinates.size();
		return new GuardRouteReport( visitedSize, isInALoop );
	}

	private static int countPossibleObstaclePositions( List<List<String>> map ) {
		List<List<String>> mapCopy = map.stream()
				.map( ArrayList::new )
				.collect( Collectors.toList() );

		int loops = 0;
		for ( int row = 0; row < mapCopy.size(); row++ ) {
			for ( int col = 0; col < mapCopy.getFirst().size(); col++ ) {
				Coordinate currentObstacleCoord = new Coordinate( row, col );
				if ( isObstacleInCoordinate( mapCopy, currentObstacleCoord ) || findStartPosition( mapCopy ).equals( currentObstacleCoord ) ) {
					continue;
				}
				mapCopy.get( row ).set( col, "#" );

				GuardRouteReport guardRoute = predictGuardRoute( mapCopy, true );
				if ( guardRoute.isOnALoop() ) {
					loops++;
				}

				mapCopy.get( row ).set( col, "." );
			}
		}
		return loops;
	}

}

record GuardRouteReport( int visited, boolean isOnALoop ) {}

enum Direction {
	UP( -1, 0 ),
	RIGHT( 0, 1 ),
	DOWN( 1, 0 ),
	LEFT( 0, -1 );

	private final int rowDelta;
	private final int colDelta;

	Direction( int rowDelta, int columnDelta ) {
		this.rowDelta = rowDelta;
		this.colDelta = columnDelta;
	}

	public int getRowDelta() {
		return rowDelta;
	}

	public int getColDelta() {
		return colDelta;
	}

	public Direction turnRight() {
		int nextDirectionIndex = ( this.ordinal() + 1 ) % Direction.values().length;
		return Direction.values()[nextDirectionIndex];
	}
}

class Coordinate {

	private final int row;
	private final int col;

	Coordinate( int row, int col ) {
		this.row = row;
		this.col = col;
	}

	public int getRow() {
		return row;
	}

	public int getCol() {
		return col;
	}

	@Override
	public String toString() {
		return String.format( "(%d,%d)", row, col );
	}

	@Override
	public boolean equals( Object o ) {
		if ( this == o ) {
			return true;
		}

		if ( o == null || getClass() != o.getClass() ) {
			return false;
		}

		Coordinate other = (Coordinate) o;
		return row == other.getRow() && col == other.getCol();
	}

	@Override
	public int hashCode() {
		return Objects.hash( row, col );
	}

}

class DirectionalCoordinate extends Coordinate {

	private String direction;

	DirectionalCoordinate( int row, int col, String direction ) {
		super( row, col );
		this.direction = direction;
	}

	public String getDirection() {
		return direction;
	}

	@Override
	public String toString() {
		return String.format( "(%d,%d) - Direction: %s", getRow(), getCol(), direction );
	}

	@Override
	public boolean equals( Object o ) {
		if ( this == o ) {
			return true;
		}

		if ( o == null || getClass() != o.getClass() ) {
			return false;
		}

		DirectionalCoordinate other = (DirectionalCoordinate) o;
		return getRow() == other.getRow() && getCol() == other.getCol()
				&& direction.equals( other.getDirection() );
	}

	@Override
	public int hashCode() {
		return Objects.hash( super.hashCode(), direction );
	}

}
